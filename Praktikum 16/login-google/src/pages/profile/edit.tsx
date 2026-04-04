import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/layouts/navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <h1>Edit Profile</h1> <br />
<div>
  <label>
    Nama:
    <input 
      type="text" 
      defaultValue="Rocky Alessandro Kristanto" 
    />
  </label>

  <br /><br />

  <label>
    Kelas:
    <input 
      type="text" 
      defaultValue="TI-3D" 
    />
  </label>

  <br /><br />

  <label>
    NIM:
    <input 
      type="text" 
      defaultValue="2341720197" 
    />
  </label>
</div>    </div>
  )
}