import Header from '../Header/Header'
import UserStories from '../UserStories/UserStories'
import PostsList from '../PostsList/PostsList'

import './Home.css'

const Home = () => {
  return (
    <div className="home-container">
      <Header />

      <main className="home-content">
        <UserStories />
        <h2 className="feed-title">Feed</h2>
        <PostsList />
      </main>
    </div>
  )
}

export default Home