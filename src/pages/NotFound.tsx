import Button from "../components/Button"

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h2 className="">Halaman tidak tersedia</h2>
        <p>Silakan kembali halaman utama untuk akses fitur yang ada</p>
        <Button text='Kembali' className="mt-8" />
    </div>
  )
}

export default NotFound
