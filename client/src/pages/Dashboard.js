import TinderCard from 'react-tinder-card';
import { useEffect, useState } from 'react';
import ChatContainer from '../components/ChatContainer';
import axios from 'axios';
import {useCookies} from 'react-cookie';

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [genderedUsers, setGenderedUsers] = useState(null)
  const [lastDirection, setLastDirection] = useState()
  const [cookies, useCookie, removeCookie] = useCookies(['user'])
  const userId = cookies.UserId

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user', {
        params: {userId}  
      })
      setUser(response.data)
    } catch(error) {
      console.log(error)
    }
  }

  const getGenderedUsers = async() => {
    try {
      const response = await axios.get('http://localhost:8000/gendered-users', {
        params: {gender: user?.gender_in}
      })
      setGenderedUsers(response.data)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
  if(user) {
    genderedUsers()
  }
}, [user])

  console.log(genderedUsers)


    // const characters = [
    //     {
    //       name: 'Richard Hendricks',
    //       url: 'https://imgur.com/a/vm3tz'
    //     },
    //     {
    //       name: 'Erlich Bachman',
    //       url: './img/erlich.jpg'
    //     },
    //     {
    //       name: 'Monica Hall',
    //       url: './img/monica.jpg'
    //     },
    //     {
    //       name: 'Jared Dunn',
    //       url: 'https://picsum.photos/id/16/2500/1667.jpg'
    //     },
    //     {
    //       name: 'Dinesh Chugtai',
    //       url: 'https://picsum.photos/id/1/200/300'
    //     }
    //   ]

    const updatedMatches = async (matchedUserId) => {
      try {
        await axios.put('http://localhost:8000/addmatch', {
          userId,
          matchedUserId
        })
        getUser()
      } catch(error) {
        console.log(error)
      }
    }

    const swiped = (direction, swipedUserId) => {

        if (direction === 'right') {
          updatedMatches(swipedUserId)
        }
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
      }

    const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)

      const filteredGenderedUsers = genderedUsers?.finder(
          genderedUser => !matchedUserIds.includes(genderedUser.user_id)
      )

    return (
      <>
      {user && 
        <div className="dashboard">
            <ChatContainer user={user}/>
            <div className="swipe-cont">
                <div className="card-cont">
                    {filteredGenderedUsers?.map((character) =>
                    <TinderCard className='swipe' key={character.user_id} onSwipe={(dir) => swiped(dir, character.user_id)} onCardLeftScreen={() => outOfFrame(character.first_name)}>
                        <div style={{ backgroundImage: 'url(' + character.url + ')' }} 
                          className='card'

                        >
                            <h3>{character.first_name}</h3>
                        </div>
                    </TinderCard>
                    )}
                    <div className="swipe-info">
                      {lastDirection ? <p>You Swiped {lastDirection}</p> : <p></p>}
                    </div>
            </div>
            </div>
        </div>}
        </>
    )
}

export default Dashboard;