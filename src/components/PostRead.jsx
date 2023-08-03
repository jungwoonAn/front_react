import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PostRead = () => {
    const navigator = useNavigate();
    const {id} = useParams();
    // console.log(id);

    //DB에서 받아온 데이터 넣어줄 state
    const [post, setPost] = useState({
        id: id,
        title: '',
        body: '',
        writer: '',
        wdate: ''
    });

    const {title, body, writer, wdate} = post;

    const callAPI = async()=>{
        const result = await axios.get(`/posts/read/${id}`); //get방식으로 정보 받기
        // console.log(result.data);
        setPost(result.data);
    }

    useEffect(()=>{
        callAPI();
    },[])

    const onDelete = async()=>{
        if(window.confirm(`${id}번 게시글을 삭제하시겠습니까?`)){
            await axios.post(`/posts/delete/${id}`);
            navigator('/posts');
        }
    }

    return (
        <Row className='my-5'>
            <Col className='p-5'>
                <h1 className='text-center'>게시글 정보</h1>
                {writer==='red' &&
                    <div className='text-end mb-3'>
                        <Link to={`/posts/update/${id}`}>
                            <Button className='me-2'>수정</Button>
                        </Link>
                        <Button variant="danger" onClick={onDelete}>삭제</Button>
                    </div>
                }

                <Card>
                    <Card.Header>
                        [{id}] {title}
                    </Card.Header>
                    <Card.Body>
                        {body}
                    </Card.Body>
                    <Card.Footer>
                        Created on {wdate.substr(0,10)} by {writer}
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    )
}

export default PostRead