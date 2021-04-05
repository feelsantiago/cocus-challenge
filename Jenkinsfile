pipeline {
  agent any
  stages {
    stage('Npm Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Run') {
      steps {
        sh 'npm run start:prod'
      }
    }

  }
  environment {
    GIT_PERSONAL_ACCESS_TOKEN = '7af2fd22ad6ac5ec045e2c7b9c7c53d3d3a3cb9a'
  }
}