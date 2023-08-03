import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import PostList from './PostList'
import PostWrite from './PostWrite'
import PostRead from './PostRead'
import PostUpdate from './PostUpdate'

const RouterPage = () => {
    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">React</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/posts">게시글</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/posts' element={<PostList />} />
                <Route path='/posts/write' element={<PostWrite />} />
                <Route path='/posts/read/:id' element={<PostRead />} />
                <Route path='/posts/update/:id' element={<PostUpdate />} />
            </Routes>
        </>
    )
}

export default RouterPage