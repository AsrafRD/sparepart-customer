"use client"
import React from "react";

const HelpPage: React.FC = () => {
  return (
    <div >
      <div className="p-4 md:px-8 md:py-6">
        <h1 className="text-2xl">Bantuan</h1>

        <section>
          <h2 className="mt-3 font-bold">
            1. FAQ (Pertanyaan yang Sering Diajukan)
          </h2>

          <div className="mt-1">
            <h3>Pertanyaan Umum:</h3>
            <ul>
              <li>
                <strong>Q :</strong> Bagaimana cara melakukan pemesanan?
                <br />
                <strong>A :</strong> Anda dapat melakukan pemesanan memilih
                produk yang diinginkan, dan mengikuti langkah-langkah pada
                halaman checkout.
              </li>

              <li>
                <strong>Q :</strong> Apa kebijakan pengembalian barang?
                <br />
                <strong>A :</strong> Barang dapat dikembalikan dalam waktu 30
                hari setelah pembelian dengan syarat dan ketentuan tertentu.
                Silakan kunjungi halaman Kebijakan Pengembalian kami untuk
                informasi lebih lanjut.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="mt-3 font-bold">2. Panduan Penggunaan Produk</h2>

          <div className="mt-1">
            <h3>Cara Memasang Suku Cadang:</h3>
            <p>
              Untuk memasang suku cadang, ikuti langkah-langkah berikut:
              <ol>
                <li>Bersihkan area pemasangan.</li>
                <li>Ambil suku cadang dari kemasannya.</li>
                <li>Pasang suku cadang sesuai petunjuk gambar.</li>
                <li>Periksa kembali kekencangan pemasangan.</li>
              </ol>
            </p>

            <h3>Panduan Perawatan Kendaraan:</h3>
            <p>
              Agar kendaraan Anda tetap dalam kondisi optimal, lakukan perawatan
              rutin, termasuk:
              <ul>
                <li>Pemeriksaan rutin oli mesin.</li>
                <li>Pengecekan tekanan ban secara berkala.</li>
                <li>Pembersihan dan pelumasan komponen tertentu.</li>
              </ul>
            </p>
          </div>
        </section>

        <section>
          <h2 className="mt-3 font-bold">3. Kontak Dukungan Pelanggan</h2>

          <div className="mt-1">
            <h3>Hubungi Kami:</h3>
            <p>
              Jika Anda memiliki pertanyaan lebih lanjut atau membutuhkan
              bantuan, jangan ragu untuk menghubungi tim dukungan pelanggan kami
              melalui formulir kontak atau nomor telepon berikut:
              <br />
              Email: support@rozicsparepart.com
              <br />
              Telepon: 0812-3456-7890
            </p>
          </div>
        </section>

        <section>
          <h2 className="mt-3 font-bold">
            4. Troubleshooting (Pemecahan Masalah)
          </h2>

          <div className="mt-1">
            <h3>Kendala Umum dan Solusinya:</h3>
            <p>
              Jika Anda mengalami kendala, coba solusi berikut sebelum
              menghubungi dukungan pelanggan:
              <ul>
                <li>Periksa kembali koneksi internet.</li>
                <li>Restart halaman browser.</li>
                <li>Update peramban ke versi terbaru.</li>
              </ul>
            </p>
          </div>
        </section>

        <section>
          <h2 className="mt-3 font-bold">5. Informasi Tambahan</h2>

          <div className="mt-1">
            <h3>Kebijakan Privasi:</h3>
            <p>
              Kebijakan privasi kami menjelaskan bagaimana kami mengumpulkan,
              menggunakan, dan melindungi informasi pribadi Anda. Silakan baca
              lebih lanjut di halaman{" "}
              <a className="text-blue-600" href="#">
                Kebijakan Privasi
              </a>
              .
            </p>

            <h3>Syarat dan Ketentuan:</h3>
            <p>
              Syarat dan ketentuan penggunaan situs dan layanan kami dapat
              ditemukan di halaman{" "}
              <a className="text-blue-600" href="#">
                Syarat dan Ketentuan
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelpPage;
