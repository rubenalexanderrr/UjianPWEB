import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

function Mahasiswa(){
    const [mahasiswa, setMahasiswa] = useState([]);

    // untuk mengambil data server yang dijalankan pada port berikut
    useEffect(() => {
        axios.get('http://localhost:8081/')
        .then(res => setMahasiswa(res.data))
        .catch(err => console.log(err));
    }, [])

    // untuk menghandle jika tombol delete ditekan
    // dan akan menghapus data mahasiswa sesuai dengan id nya
    // menggunakan method delete
    const handleDelete = async (id) => {
        try{
            await axios.delete('http://localhost:8081/mahasiswa/' + id)
            window.location.reload()
        }catch(err){
            console.log(err);
        }
    }

    return (
        // table data mahasiswa
        <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>
            <div className='w-75 bg-dark p-3'>
            <h1 className='text-white text-center'>Data Mahasiswa</h1>
                <Link to="/add" className='btn btn-success mb-2 ms-2'>Add +</Link>
                <table className='table table-dark text-center'>
                    <thead>
                        <tr>
                            <th>NPM</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Kelas</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        mahasiswa.map((data, i) => (
                            <tr key={i}>
                                <td>{data.Npm}</td>
                                <td>{data.Nama}</td>
                                <td>{data.Email}</td>
                                <td>{data.Kelas}</td>
                                <td>
                                    <Link to={`edit/${data.ID}`} className='btn btn-info me-2'>Edit</Link>
                                    <button className='btn btn-danger ms-2' onClick={e => handleDelete(data.ID)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Mahasiswa;
