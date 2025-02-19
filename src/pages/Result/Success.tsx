import { Mail02Icon } from "hugeicons-react"
import Button from "../../components/Button"

const Success = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="w-[50vw] h-max text-center flex flex-col justify-center items-center rounded-[12px] bg-white border border-slate-300 py-14 px-6">
            <Mail02Icon className="w-14 h-14 mb-6 text-blue-500" />
            <h2 className="text-[40px] font-medium mb-6">Periksa akun email anda</h2>
            <p className="w-[80%] leading-loose text-slate-500 font-light mb-6">
                Warehouse telah mengirim pesan email yang berisi link untuk melakukan pembaruan kata sandi akun anda
            </p>
            <Button
                url="/"
                text="Kembali sekarang"
                className="w-full cursor-pointer rounded-lg border border-blue-600 bg-blue-600 p-4 text-white transition hover:bg-opacity-90"
            />
        </div>
    </div>
  )
}

export default Success
