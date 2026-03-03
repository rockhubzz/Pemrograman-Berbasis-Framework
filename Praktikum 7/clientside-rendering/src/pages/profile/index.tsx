import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/layouts/navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <h1>My Profile</h1> <br />
      <p>Nama: Rocky Alessandro Kristanto</p>
      <p>Kelas: TI-3D</p>
      <p>NIM: 2341720197</p>
    </div>
  )
}