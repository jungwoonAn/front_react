import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const PostUpdate = () => {
    const navigator = useNavigate();
    const {id} = useParams();
    const [form, setForm] = useState({
        id: '',
        title: '',
        body: ''
    });
    const {title, body} = form;

    const callAPI = async()=>{
        const result = await axios.get(`/posts/read/${id}`);
        console.log(result.data);
        setForm(result.data);
    }

    useEffect(()=>{
        callAPI();
    },[])

    const onChangeForm = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onUpdate = async()=>{
        if(window.confirm(`${id}번 게시글을 수정하시겠습니까?`)){
            await axios.post('/posts/update', form);
            navigator(-1);
        }
        // if(title===''){
        //     alert('제목을 입력하세요.');
        // }else if(body===''){
        //     alert('내용을 입력하세요.');
        // }else {
        //     await axios.post('/posts/update', form);
        //     alert('글이 수정되었습니다.')
        //     navigator(-1);
        // }
    }

    return (
        <Row className='my-5'>
            <Col className='p-5'>
                <h1 className='text-center'>게시글 수정</h1>

                <Form>
                    <Form.Control name='title' value={title} className='my-3' placeholder='제목을 입력하세요' onChange={onChangeForm}/>
                    <Form.Control name='body' value={body} as='textarea' rows={10} placeholder='내용을 입력하세요' onChange={onChangeForm} />
                    <div className='text-end mt-3'>
                        <Button className='me-2' onClick={onUpdate}>수정</Button>
                        <Button variant='secondary' onClick={callAPI}>취소</Button>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}

export default PostUpdate