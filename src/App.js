import './App.css';
import Home from './Components/Home/Home';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from './Service/Firebase'
import Sign from './Auth/SignUp';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Navbar from './Navbar/Navbar'


export const UserNameContext = React.createContext('')

function App() {
  const [user] = useAuthState(auth)
  const [userName, setuserName] = useState('')
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts').orderBy("timestamp", "desc").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map(data => ({
        id: data.id,
        post: data.data()
      })))
    })
  }, []);

  return (
    <div>
      {
        user ?
          <>
            <UserNameContext.Provider value={userName}>
              <Navbar />
              <Container>
                <Row>
                  {
                    Posts.map(({ id, post }) => {
                      return (
                        <Col lg='6' key={id}>
                          <Home postId={id} username={post.username} imageUrl={post.imageUrl} caption={post.caption} />
                        </Col>
                      )
                    })
                  }
                </Row>
              </Container>
            </UserNameContext.Provider>
          </> :
          <Sign setuserName={setuserName} />
      }
    </div>
  );
}

export default App;
