import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Edit() {
    const [npm, setNpm] = useState('')
    const [nama, setNama] = useState('')
    const [email, setEmail] = useState('')
    const [kelas, setKelas] = useState('')
    const {id} = useParams();
    const navigate = useNavigate();

    // untuk mengambil data pada database dengan id yang sesuai dan memasukkanya kedalam variabel
    useEffect(() => {
        axios.get('http://localhost:8081/update/'+id)
        .then(res => {
            setNpm(res.data[0].Npm);
            setNama(res.data[0].Nama);
            setEmail(res.data[0].Email);
            setKelas(res.data[0].Kelas);
        })
        .catch(err => console.log(err));
    }, [])

    // untuk menghandle tombol submit
    // dan akan melakukan method put untuk mengupdate data yang sudah diubah
    // dan jika tidak terupdate akan menampilkan alert
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8081/edit/'+id, {npm, nama, email, kelas})
        .then(res => {
            console.log(res);
            if(res.data.updated) {
                navigate('/');
            }else {
                alert('Not Updated');
            }
        }).catch(err => console.log(err));
    }

    return (
        <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>
            <div className='w-75 h-auto bg-dark rounded p-3'>
                {/* form untuk mengedit data mahasiswa */}
                <form className='text-white' onSubmit={handleSubmit}>
                    <h2>Edit Mahasiswa</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>NPM</label>
                        <input type="number" placeholder='Masukkan NPM' required value={npm} className='form-control' 
                        onChange={e => setNpm(e.target.value)}></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Nama</label>
                        <input type="text" placeholder='Masukkan Nama' required value={nama} className='form-control'
                        onChange={e => setNama(e.target.value)}></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Email</label>
                        <input type="email" placeholder='Masukkan Email' required value={email} className='form-control'
                        onChange={e => setEmail(e.target.value)}></input>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor=''>Kelas</label>
                        <input type="text" placeholder='Masukkan Kelas' required value={kelas} className='form-control'
                        onChange={e => setKelas(e.target.value)}></input>
                    </div>
                    <Link to="/" className='btn btn-danger me-2'>Back</Link>
                    <input type="submit" className='btn btn-info'></input>
                </form>
            </div>
        </div>

    );
}

export default Edit;
