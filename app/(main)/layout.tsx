import Navbar from "@/components/navbar/Navbar"


type Props={
    children : React.ReactNode
}
const layout = ({children}:Props) => {
    return (
        <div className="flex h-full items-center justify-start">
            <Navbar />
            {children}
        </div>
    )
}

export default layout