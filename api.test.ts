import axios from 'axios'
async function test() {
  const loginAdmin = await axios({
    url: 'http://localhost:3000/login',
    method: 'post',
    data: {      
      email: 'admin@email.com',
      password: 'admin',
    }
  })

  const tokenAdmin = loginAdmin.data.token
  await axios({
    url: 'http://localhost:3000/user',
    method: 'get',
    headers: {
      'Authorization': `Basic ${tokenAdmin}` 
    }
  }).then(dt => console.log(dt.data))

  // await axios({
  //   url: 'http://localhost:3000/user',
  //   method: 'post',
  //   data: {
  //     name: 'any_name',
  //     email: 'any_email',
  //     password: '12345',
  //   }
  // })


  // await axios({
  //   url: 'http://localhost:3000/user/2',
  //   method: 'put',
  //   data: {
  //     name: 'outher_name',
  //     email: 'outher_email',      
  //   }
  // }).then(dt => console.log(dt.data))

  // await axios({
  //   url: 'http://localhost:3000/user/2',
  //   method: 'delete',    
  // }).then(dt => console.log(dt.data))

  // await axios({
  //   url: 'http://localhost:3000/playlist',
  //   method: 'post',
  //   data: {
  //     authorId: 4,
  //     name: 'any_name',
  //     genre: 'any_genre',
  //     musics: ['music_1', 'music_2'],
  //   }
  // })

  const loginUser = await axios({
    url: 'http://localhost:3000/login',
    method: 'post',
    data: {
      email: 'any_email',
      password: '12345',
    }
  })
  const tokenUser = loginUser.data.token

  // await axios({
  //   url: 'http://localhost:3000/playlist/4',
  //   method: 'get',
  //   headers: {
  //     'Authorization': `Basic ${tokenUser}`
  //   }
  // }).then(dt => console.log(dt.data))

  // await axios({
  //   url: 'http://localhost:3000/playlist/4',
  //   method: 'get',
  //   headers: {
  //     'Authorization': `Basic ${tokenUser}`
  //   }
  // }).then(dt => console.log(dt.data))

  // await axios({
  //   url: 'http://localhost:3000/playlist/4/4',
  //   method: 'delete',
  // }).then(dt => console.log(dt.data))


  // await axios({
  //   url: 'http://localhost:3000/playlist/4/3',
  //   method: 'put',
  //   data: {
  //     name: 'outher_name',
  //     genre: 'outher_genre',      
  //     musics: ['music_1', 'music_2', 'music_3'],
  //   }
  // }).then(dt => console.log(dt.data))

}

test()