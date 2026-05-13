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
                sh 'docker-compose build'
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh 'docker-compose down || true'
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker-compose up -d'
            }
        }

        stage('Verify') {
            steps {
                sh 'docker ps'
            }
        }
    }

    post {

        success {
            mail to: 'sammanhabib22004@gmail.com',
            subject: "SUCCESS: Smart Campus Build Passed",
            body: "Your CI/CD pipeline ran successfully."
        }

        failure {
            mail to: 'sammanhabib22004@gmail.com',
            subject: "FAILED: Smart Campus Build Failed",
            body: "Check Jenkins console logs."
        }
    }
}