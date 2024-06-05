import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/global.scss'
import { Header } from './components/layout/Header'
import { Main } from './pages/Main'
import { Posts } from './components/post/Posts'
import { NotFound } from './pages/NotFound'
import { Post } from './components/post/Post'
import { PostInputForm } from './components/post/PostInputForm'

const App = () => {
  return (
    <div className="back_ground">
      <BrowserRouter>
        <div className="App">
          <Header />
          <section>
            <Routes>
              <Route path="/" element={<Main />}/>
              <Route path="/posts" element={<Posts />}/>
              <Route path="/post/:postId" element={<Post />} />
              <Route path="/post-create" element={<PostInputForm />} />
              <Route path="*" element={<NotFound />}/>
            </Routes>
          </section>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
