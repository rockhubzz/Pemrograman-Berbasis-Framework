import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <p>Nama: Rocky Alessandro Kristanto</p>
      <p>NIM: 2341720197</p>
      <p>Program Studi: Teknik Informatika</p>
    </div>
  )
}
