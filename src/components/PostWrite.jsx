import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PostWrite = () => {
    const navigator = useNavigate();
    const [form, setForm] = useState({
        title: '',
        body: '',
        writer: 'red'
    });
    const {title, body, writer} = form;

    const onChangeForm = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value //속성name을 받아서 value값을 넣어줌
        })
    }

    const onInsert = async()=>{
        if(title===''){
            alert('제목을 입력하세요.');
        }else if(body===''){
            alert('내용을 입력하세요.');
        }else {
            await axios.post('/posts/insert', form);
            alert('새로운 글이 등록되었습니다.');
            navigator('/posts');
        }
    }

    return (
        <Row className='my-5'>
            <Col className='p-5'>
                <h1 className='text-center'>게시글 등록</h1>

                <Form>
                    <Form.Control name='title' value={title} className='my-3' placeholder='제목을 입력하세요' onChange={onChangeForm} />
                    <Form.Control name='body' value={body} as='textarea' rows={10} placeholder='내용을 입력하세요' onChange={onChangeForm} />
                    <div className='text-end mt-3'>
                        <Button className='me-2' onClick={()=>onInsert()}>등록</Button>
                        <Button variant='secondary'>취소</Button>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}

export default PostWrite