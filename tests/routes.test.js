const request = require('supertest');
const app = require('../app');
const { hashPassword, comparePassword } = require('../helpers/bcrypt');
const { generateToken, verifyToken } = require('../helpers/jwt');
const UserController = require('../controllers/userController');
const PhotoController = require('../controllers/photoController');

const mockRequest = (sessionData, body, params, query) => ({
  body,
  params,
  query,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// describe('User Test', () => {
//   const password = 'admin'; // datainput
//   const hashing = hashPassword(password);
//   const compare = comparePassword(password, hashing);

//   const payloadJwt = {
//     id: 1,
//     email: 'andrey@mail.com',
//   };
//   const payloadString = 'adaaja';
//   it('Password compare to be return boolean', () => { // unit testing
//     expect(typeof compare).toBe('boolean');
//   });
//   it('Should return true when compile password', () => {
//     expect(compare).toEqual(true);
//   });

//   it('Should return object when using jwt', () => {
//     const generate = generateToken(payloadJwt);
//     const verify = verifyToken(generate);
//     expect(verify).toMatchObject(payloadJwt);
//   });
//   it('should ...', () => {
//     const generate = generateToken(payloadString);
//     const verify = verifyToken(generate);
//     expect(verify).toBe(payloadString);
//   });

//   it('should fetch all albums', async () => { // integration testing
//     const res = await request(app).get('/photos');
//     expect(res.statusCode).toEqual(200);
//     // expect(res.body).toHaveProperty('post');
//   });

//   it('Test get Photos', async () => {
//     const req = mockRequest();
//     const res = mockResponse();
//     await PhotoController.getAllPhotos(req, res);
//     expect(res.status).toHaveBeenCalledWith(200);
//   });

//   it('Test user Login', async () => {
//     const req = mockRequest({}, {
//       email: 'andrey@mail.com',
//       password: 'admin',
//     });
//     const res = mockResponse();
//     await UserController.login(req, res);
//     expect(res.status).toHaveBeenCalledWith(200);
//   });
// });

//---------------------------

describe('Assignment 3 - Test PhotoAlbum', () => {
  it('GetAllPhotos', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await PhotoController.getAllPhotos(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('GetAllPhotosFailed', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await PhotoController.getAllPhotos(req, res);
    res.status = 401
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('GetOnePhotoByID', async () => {
    const req = mockRequest({},{}, {
      id: 2
    });
    const res = mockResponse();
    await PhotoController.getOnePhotoByID(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('GetOnePhotoByIDFailed', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await PhotoController.getOnePhotoByID(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('CreatePhoto', async () => {
    const req = mockRequest({}, {
      title: "Photo1",
      caption: "Andi Photo",
      image_url: "http:\\photo.com"
    });
    const res = mockResponse();
    await PhotoController.createPhoto(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('CreatePhotoFailed', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await PhotoController.createPhoto(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
  
});
