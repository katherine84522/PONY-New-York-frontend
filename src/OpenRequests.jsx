import ProtectorNavBar from './ProtectorNavBar'

const OpenRequests = () => {
    return (
        <div className='flex flex-col bg-red-500'>
            <div>These are the open requests</div>
            < ProtectorNavBar />
        </div>
    )
}

export default OpenRequests