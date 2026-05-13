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
                bat 'wsl docker-compose build'
            }
        }

        stage('Stop Old Containers') {
            steps {
                bat 'wsl docker-compose down || true'
            }
        }

        stage('Run Containers') {
            steps {
                bat 'wsl docker-compose up -d'
            }
        }

        stage('Verify') {
            steps {
                bat 'wsl docker ps'
            }
        }
    }

    post {

        success {
            mail to: 'sammanhabib22004@gmail.com',
            subject: "SUCCESS: Smart Campus Build Passed",
            body: "Pipeline successfully deployed via WSL Docker."
        }

        failure {
            mail to: 'sammanhabib22004@gmail.com',
            subject: "FAILED: Smart Campus Build Failed",
            body: "Check Jenkins logs."
        }
    }
}