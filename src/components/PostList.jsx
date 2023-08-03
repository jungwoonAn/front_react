import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const callAPI = async () => {
        setLoading(true);
        const result = await axios.get(`/posts?page=${page}`);
        // console.log(result.data);
        setPosts(result.data);

        const totalPost = await axios.get('/posts/total');
        setLastPage(Math.ceil(totalPost.data.total/5));
        setLoading(false);
    }

    useEffect(() => {
        callAPI();
    }, [page]);

    if(loading) return <h1 className='text-center my-5'>로딩중입니다...</h1>

    return (
        <Row className='my-5'>
            <Col className='p-5'>
                <h1 className='text-center'>게시글 목록</h1>

                <div className='text-end mb-3'>
                    <Link to={'/posts/write'}>
                        <Button>글쓰기</Button>
                    </Link>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Title</td>  
                            <td>Writer</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post=>
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td><Link to={`/posts/read/${post.id}`}>{post.title}</Link></td>
                                <td>{post.writer}</td>
                                <td>{post.wdate.substr(0,10)}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                <div className="text-center mt-3">
                    <Button disabled={page===1} onClick={()=>{setPage(page-1)}} size='sm'>이전</Button>
                    <span className='mx-3'>{page}</span>
                    <Button disabled={page===lastPage} onClick={()=>{setPage(page+1)}} size='sm'>다음</Button>
                </div>

            </Col>
        </Row>
    )
}

export default PostList