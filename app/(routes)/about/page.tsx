import React from "react";

const page = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden sm:rounded-lg">
          {/* Isi halaman profil usaha disini */}
          <div className="p-6">
            <h1 className="text-xl font-semibold text-gray-700 mb-2">
              Selamat datang di Rozic Sparepart!
            </h1>
            <h1 className="text-2xl font-semibold mb-4">Tentang Kami</h1>

            {/* Tambahkan informasi profil usaha Anda sesuai kebutuhan */}
            <div className="mt-4 flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-2">- Visi -</h2>
              <p className="text-gray-700">
                Menjadi penyedia solusi terkemuka dalam industri suku cadang
                otomotif, memberikan nilai tambah melalui inovasi, kualitas, dan
                layanan terbaik.
              </p>
            </div>

            <div className="mt-4 flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-2">- Misi -</h2>
              <p className="text-gray-700">
                Menyediakan suku cadang otomotif berkualitas tinggi untuk
                memastikan keamanan dan kinerja optimal kendaraan pelanggan.
                Memberikan pelayanan pelanggan yang unggul dengan kecepatan,
                keakuratan, dan keramahan.
              </p>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Sejarah Singkat</h2>
              <p className="text-gray-700">
                "Rozic Sparepart didirikan pada tahun 2020 dengan visi untuk
                menjadi pemimpin dalam menyediakan suku cadang otomotif terbaik.
                Sejak awal, kami berkomitmen untuk memberikan produk berkualitas
                tinggi dan pelayanan pelanggan terbaik. Dengan berbagai
                pengalaman dan pengetahuan, kami telah tumbuh menjadi destinasi
                utama bagi pemilik kendaraan yang mencari suku cadang andal dan
                terpercaya. Kami bangga dapat berkontribusi pada mobilitas yang
                aman dan efisien bagi pelanggan kami."
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
