"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import NavbarActions from "@/components/navbar-actions";
import InputSearch from "./input-search";
import Link from "next/link";
import {
  FacebookLogo,
  InstagramLogo,
  TiktokLogo,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import Image from "next/image";
import logo from "@/public/assets/RS.png";
import { Button } from "./ui/button";
import clsx from "clsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 " onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-60 flex-col bg-white mt-10 shadow-xl">
                <div className="flex justify-between items-center pb-1 pt-1 mr-5">
                  <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
                    <Image src={logo} alt="Logo" width={62} height={62} />
                  </Link>
                  <Button
                    type="button"
                    className={clsx(
                      "relative inline-flex items-center justify-center rounded-full p-1 h-7 text-gray-700 bg-gray-100 border border-gray-300 shadow-md"
                    )}
                    variant="ghost"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <X size={18} aria-hidden="true" />
                  </Button>
                </div>

                <div className="space-y-3 border-t border-gray-200 px-4 py-4">
                  <Link href="/" className="-m-2 p-2 flex lg:ml-0">
                    <p className="font-medium text-gray-900">Dashboard</p>
                  </Link>

                  <div className="flex flex-col space-y-2 -m-2 px-2 flex lg:ml-0">
                    <Link
                      href="/systemPakar"
                      className="font-medium text-gray-900"
                    >
                      Periksa kendaraan anda
                    </Link>
                  </div>
                  <div className="flex flex-col space-y-2 -m-2 px-2 flex lg:ml-0">
                    <Link
                      href="/orders/check"
                      className="font-medium text-gray-900"
                    >
                      Cek pesanan saya
                    </Link>
                  </div>
                  <div className="-m-2 px-2 lg:ml-0">
                    <Link href="/about">
                      <p className="font-medium text-gray-900">Tentang Kami</p>
                    </Link>
                  </div>
                  <div className="-m-2 px-2 flex lg:ml-0">
                    <Link href="/help">
                      <p className="font-medium text-gray-900">Bantuan</p>
                    </Link>
                  </div>

                  {/* {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))} */}
                </div>

                <div className="fixed bottom-0 ml-">
                  <div className="space-y-4 pt-14 mb-5 border-gray-200 px-4">
                    <div className="flow-root">
                      <div className="flex justify-center">
                        <ul className="flex jusstify-center items-center text-gray-500 space-x-4 mt-4 mb-6">
                          <li>
                            <Link href="#">
                              <FacebookLogo size={25} />
                            </Link>
                          </li>
                          <li>
                            <Link href="https://api.whatsapp.com/send?phone=6285727279577">
                              <WhatsappLogo size={25} />
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <InstagramLogo size={25} />
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <TiktokLogo size={25} />
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <p className="-m-2 block p-2 font-medium text-gray-900">
                          Alamat
                        </p>
                        <div className="text-sm">
                          <ul className="flex flex-col justify-center items-center">
                            <li>
                              <p>Candirejo Rt.02 / Rw.03</p>
                            </li>
                            <li>
                              <p>Ketangi, Kaliangkrik, Magelang</p>
                            </li>
                            <li>
                              <p>Jawa Tengah, (56153) </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <div className="bg-orange-300">
          <div className="flex justify-between items-center px-4 h-10">
            <div className="hidden md:block ml-4 mt-2">
              <ul className="flex jusstify-center items-center text-gray-600 space-x-4 mt-4 mb-6">
                <li>
                  <Link href="#">
                    <FacebookLogo size={20} className="hover:text-black" />
                  </Link>
                </li>
                <li>
                  <Link href="https://api.whatsapp.com/send?phone=6285727279577">
                    <WhatsappLogo size={20} className="hover:text-black" />
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <InstagramLogo size={20} className="hover:text-black" />
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <TiktokLogo size={20} className="hover:text-black" />
                  </Link>
                </li>
              </ul>
            </div>
            <p className="flex h-10 items-center justify-center px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
              Gratis ongkir minimal pembelian Rp.100.000
            </p>
            <Link
              href="/help"
              className="hidden md:block text-gray-600 hover:text-black cursor-pointer"
            >
              Bantuan
            </Link>
          </div>
        </div>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center gap-x-7">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Flyout menus */}
              <div className="hidden md:block space-x-6">
                <Link href="/">
                  <Image src={logo} alt="Logo" width={72} height={72} />
                </Link>
              </div>

              <div className="hidden md:block space-x-6">
                <Link
                  href="/"
                  className="text-md font-medium text-gray-600 hover:text-black active:text-black"
                >
                  Dashboard
                </Link>
                <Link
                  href="/about"
                  className="text-md font-medium text-gray-600 hover:text-black active:text-black"
                >
                  Tentang Kami
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 mr-4">
                  {/* <span className="h-6 w-px bg-gray-400" aria-hidden="true" /> */}
                  <Link
                    href="/systemPakar"
                    className="text-md font-medium text-gray-600 hover:text-black active:text-black"
                  >
                    Periksa kendaraan saya
                  </Link>
                  <Link
                    href="/orders/check"
                    className="text-md font-medium text-gray-600 hover:text-black active:text-black"
                  >
                    Cek pesanan saya
                  </Link>
                </div>

                {/* Search */}
                <InputSearch />

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <NavbarActions />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
