# FabricJS-ReactJS

_Project made during [GrabOn Hackathon](https://hackerbay.co/user#/challenges/scripton)_

## Running

* This app uses [Cloudinary](https://cloudinary.com/) - an image and video mangement service, hence api code is required.
* Create a file in `src/` and name it `secret.js`.
* Obtain credentials from cloudinary and insert as follows
* ```javascript
  export const cloudinaryConfig = {
    cloud_name: 'XXX',
    api_key: 'XXX',
    api_secret: 'XXX',
  };
  ```

- Install dependencies

```
yarn
```

* Start app

```
yarn start
```

## Client app

* A seller app in conjuction with this app is [Fabricon-Seller](https://github.com/abiduzz420/fabricOn-seller-client)

## Technology

* ReactJS
* Konva
* Cloudinary SDK
* Bootstrap
* HTML2Canvas
