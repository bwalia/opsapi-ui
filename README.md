# Opsapi UI

UI for the opsapi, built on the top of the React-Admin.

## Deploy on Kubernates

To deploy OPSAPI UI on kubernates, please follow the instructions.

#### Requirements:

    1. kubectl
    2. kubeseal
    3. helm

#### Installation:

    1. encode the .env file to base64
        Here is the sample of .env

        VITE_LOGIN_SERVER=<opsapi_server>
        VITE_API_URL=<opsapi_server>/api/v2
        VITE_LOGIN_URL=<opsapi_server>/auth/login

    2. Create a secret.yaml file and add the encoded .env in it.
        Here is the example of secret.yaml

        apiVersion: v1
        data:
            env_file: <put your encoded .env content here>
        kind: Secret
        metadata:
            creationTimestamp: null
            name: opsapi-ui-secrets
            namespace: <namespace>

    3. Run this command to generate the kubeseal:
        kubeseal --format=yaml < secret.yaml > sealed-secret.yaml

    4. You will get the sealed-secret.yaml file open the file and copy the content from key env_file.

    5. Put the copied secret to values file under the secrets -> secure_env_file

    6. Deploy OPSAPI UI using helm:
        helm upgrade --install opsapi-ui-<namespace> -f ./devops/ helm-chart/value-<namespace>.yaml ./devops/helm-chart \
        --set image.repository=bwalia/opsapi-ui \
        --set image.tag=latest \
        --namespace <namespace> --create-namespace

## Run Local

To run the OPSAPI UI on local follow the steps:

#### Requirments:

    1. Node >= 20

#### Installation:

    1. yarn Install
    2. yarn run dev
