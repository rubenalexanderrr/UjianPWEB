import axios from 'axios';
import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Add() {
    const [npm, setNpm] = useState('')
    const [nama, setNama] = useState('')
    const [email, setEmail] = useState('')
    const [kelas, setKelas] = useState('')
    const navigate = useNavigate();

    // untuk menghandle jika tombol submit ditekan
    // dan akan melakukan method post dari data yang sudah diisi
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/add', {npm, nama, email, kelas})
        .then(res => {
            console.log(res);
            navigate('/');
        }).catch(err => console.log(err));
    }
    return (
        <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>
            <div className='w-75 h-auto bg-dark p-3'>
                {/* form untuk menambahkan mahasiswa */}
                <form className='text-white' onSubmit={handleSubmit}>
                    <h2>Tambah Mahasiswa</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>NPM</label>
                        <input type="number" placeholder='Masukkan NPM' required className='form-control' 
                        onChange={e => setNpm(e.target.value)}></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Nama</label>
                        <input type="text" placeholder='Masukkan Nama' required className='form-control'
                        onChange={e => setNama(e.target.value)}></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Email</label>
                        <input type="email" placeholder='Masukkan Email' required className='form-control'
                        onChange={e => setEmail(e.target.value)}></input>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor=''>Kelas</label>
                        <input type="text" placeholder='Masukkan Kelas' required className='form-control'
                        onChange={e => setKelas(e.target.value)}></input>
                    </div>
                    <Link to="/" className='btn btn-danger me-2'>Back</Link>
                    <input type="submit" className='btn btn-info'></input>
                </form>
            </div>
        </div>
    );
}

export default Add;
