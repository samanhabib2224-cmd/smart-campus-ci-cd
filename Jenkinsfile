pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/samanhabib2224-cmd/smart-campus-ci-cd.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                bat 'wsl.exe -e bash -ic "cd /mnt/c/Users/saman/OneDrive/Desktop/smart-campus-portal && docker compose build"'
            }
        }

        stage('Stop Containers') {
            steps {
                bat 'wsl.exe -e bash -ic "cd /mnt/c/Users/saman/OneDrive/Desktop/smart-campus-portal && docker compose down || true"'
            }
        }

        stage('Run Containers') {
            steps {
                bat 'wsl.exe -e bash -ic "cd /mnt/c/Users/saman/OneDrive/Desktop/smart-campus-portal && docker compose up -d"'
            }
        }

        stage('Verify') {
            steps {
                bat 'wsl.exe -e bash -ic "docker ps"'
            }
        }
    }

    post {
        success {
            mail to: 'sammanhabib22004@gmail.com',
            subject: "SUCCESS: Smart Campus Build Passed",
            body: "CI/CD pipeline deployed successfully using WSL Docker Compose"
        }

        failure {
            mail to: 'sammanhabib22004@gmail.com',
            subject: "FAILED: Smart Campus Build Failed",
            body: "Check Jenkins logs for WSL execution error"
        }
    }
}