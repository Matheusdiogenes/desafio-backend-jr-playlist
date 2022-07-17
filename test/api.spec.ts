import axios from 'axios'

describe('API Test', () => {
  let tokenAdmin: string
  test('Deve ter um usuário padrão', async () => {
    const loginAdmin = await axios({
      url: 'http://localhost:3000/login',
      method: 'post',
      data: {
        email: 'admin@email.com',
        password: 'admin',
      }
    })

    tokenAdmin = loginAdmin.data.token
    const response = await axios.get('http://localhost:3000/user', {
      headers: {
        'Authorization': `Basic ${tokenAdmin}`
      }
    })
    expect(response.status).toBe(200)
  })

  test('Admin não deve ser capaz acessar playlists (GET) (StatusCode 403)', async () => {
    const response = await axios({
      url: 'http://localhost:3000/playlist',
      method: 'get',
      headers: {
        'Authorization': `Basic ${tokenAdmin}`
      }
    }).catch((err) => {
      return err.response
    })
    expect(response.status).toBe(403)
  })

  test('Admin não deve ser capaz criar playlist (POST) (StatusCode 403)', async () => {
    const response = await axios({
      url: 'http://localhost:3000/playlist',
      method: 'post',
      headers: {
        'Authorization': `Basic ${tokenAdmin}`
      },
      data: {
        name: 'any_name',
        genre: 'any_genre',
        musics: ['music_1', 'music_2', 'music_3'],
      }
    }).catch((err) => {
      return err.response
    })
    expect(response.status).toBe(403)
  })

  test('Admin não deve ser capaz de atualizar uma playlist (PUT) (StatusCode 403)', async () => {
    const response = await axios({
      url: 'http://localhost:3000/playlist/1',
      method: 'put',
      headers: {
        'Authorization': `Basic ${tokenAdmin}`
      },
      data: {
        name: 'outher_name',
        genre: 'outher_genre',
        musics: ['music_1'],
      }
    }).catch((err) => {
      return err.response
    })
    expect(response.status).toBe(403)
  })

  test('Admin não deve ser capaz de deletar uma playlist (DELETE) (StatusCode 403)', async () => {
    const response = await axios({
      url: 'http://localhost:3000/playlist/1',
      method: 'delete',
      headers: {
        'Authorization': `Basic ${tokenAdmin}`
      }
    }).catch((err) => {
      return err.response
    })
    expect(response.status).toBe(403)
  })

  describe('Atividades do usúario com ROLE "USER"', () => {
    test('Deve criar um usuário', async () => {
      const response = await axios({
        url: 'http://localhost:3000/user',
        method: 'post',
        data: {
          name: 'any_name',
          email: 'any_email',
          password: '12345',
        }
      })


      expect(response.status).toBe(200)
      expect(response.data.id).toBeDefined()
    })
    let tokenUser: string
    test('Login usúario', async () => {
      const loginUser = await axios({
        url: 'http://localhost:3000/login',
        method: 'post',
        data: {
          email: 'any_email',
          password: '12345',
        }
      })
      tokenUser = loginUser.data.token
      expect(loginUser.data.token).toBeDefined()
    })

    test('Deve obter todas as playlist', async () => {
      const response = await axios({
        url: 'http://localhost:3000/playlist',
        method: 'get',
        headers: {
          'Authorization': `Basic ${tokenUser}`
        }
      }).then(dt => dt.data)

      expect(response).toHaveLength(0)
    })

    test('Deve criar uma playlist', async () => {
      const response = await axios({
        url: 'http://localhost:3000/playlist',
        method: 'post',
        headers: {
          'Authorization': `Basic ${tokenUser}`
        },
        data: {
          name: 'any_name',
          genre: 'any_genre',
          musics: ['music_1', 'music_2', 'music_3'],
        }
      })
      expect(response.status).toBe(200)
    })

    test('Deve ter uma playlist', async () => {
      const response = await axios({
        url: 'http://localhost:3000/playlist',
        method: 'get',
        headers: {
          'Authorization': `Basic ${tokenUser}`
        }
      }).then(dt => dt.data)

      expect(response).toHaveLength(1)
    })

    test('Deve atualizar uma playlist', async () => {
      const response = await axios({
        url: 'http://localhost:3000/playlist/1',
        method: 'put',
        headers: {
          'Authorization': `Basic ${tokenUser}`
        },
        data: {
          name: 'outher_name',
          genre: 'outher_genre',
          musics: ['music_1', 'music_2'],
        }
      })
      expect(response.status).toBe(200)
    })

    describe('Atividades não autorizadas (ROLE: "USER")', () => {
      test('Usúario deve ter acesso negado (GET) (StatusCode 403)', async () => {
        const response = await axios.get('http://localhost:3000/user', {
          headers: {
            'Authorization': `Basic ${tokenUser}`
          }
        }).catch((err) => {
          return err.response
        })

        expect(response.status).toBe(403)
      })

      test('Usúario deve ter acesso negado (PUT) (StatusCode 403)', async () => {
        const response = await axios({
          url:'http://localhost:3000/user/2',
          method: 'put',
          headers: {
            'Authorization': `Basic ${tokenUser}`
          },
          data: {
            name: 'any_name',
            email: 'any_email',            
          }
        }).catch((err) => {
          return err.response
        })
        expect(response.status).toBe(403)
      })

      test('Usúario deve ter acesso negado (DELETE) (StatusCode 403)', async () => {
        const response = await axios.delete('http://localhost:3000/user/2', {
          headers: {
            'Authorization': `Basic ${tokenUser}`
          }
        }).catch((err) => {
          return err.response
        })
        expect(response.status).toBe(403)
      })

    })

  })
})
