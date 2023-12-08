import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Add from './add';
import Edit from './edit';
import Mahasiswa from './mahasiswa';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        {/* route path untuk halaman utama/awal */}
        <Route path='/' element={<Mahasiswa/>}></Route>
        {/* route path untuk halaman ketika ingin menambahkan data */}
        <Route path='/add' element={<Add/>}></Route>
        {/* route path untuk halaman jika ingin mengubah data */}
        <Route path='/edit/:id' element={<Edit/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
