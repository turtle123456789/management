import React, { useEffect, useState } from 'react'

const HomePage = () => {
  const [color,setColor] = useState("")
  const user = JSON.parse(localStorage.getItem("userLogin"))
  console.log('user', user.status)
  console.log('color', color)
  const status = user.status.trim().toLowerCase();


  useEffect(()=>{
    console.log('stádasdatus', status)
    if(status==="đã thanh toán" || status==="Đã thanh toán " || status==="Đã Thanh Toán" || status==="ĐÃ THANH TOÁN" || status==="da thanh toan")
      { 
        setColor("#05ff71")
      }else if(status==="chưa thanh toán" || status==="Chưa thanh toán " || status==="Chưa Thanh Toán" || status==="CHƯA THANH TOÁN" || status==="chua thanh toan")
      {
        setColor("#ff0505")
      }else{
        setColor("")
      }
  },[user.status])
  
  return (
    <div>
        <div className='flex items-center justify-center h-screen '>
            <div className="w-full max-w-[1050px] bg-[#ffe2c2] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h1 className='text-3xl font-medium text-gray-900 dark:text-white'>Thông tin khoản vay</h1>
                <div className='p-11'>
                    <p className="mb-1 flex text-xl font-bold text-gray-900 dark:text-white">Họ tên khách: <span className='ml-4 font-medium text-lg'>{user.name}</span></p>
                    <p className="mb-1 flex text-xl font-bold text-gray-900 dark:text-white">Số điện thoại: <span className='ml-4 font-medium text-lg'>{user.phone}</span></p>
                    <p className="mb-1 flex text-xl font-bold text-gray-900 dark:text-white">Số lượng khoản vay: <span className='ml-4 font-medium text-lg'>{user.debt}</span></p>
                    <p className="mb-1 flex text-xl font-bold text-gray-900 dark:text-white">Số tiền vay: <span className='ml-4 font-medium text-lg'>{user.loan}</span></p>
                    <p className="mb-1 flex text-xl font-bold text-gray-900 dark:text-white">Số tiền cần thanh toán: <span className='ml-4 font-medium text-lg'>{user.amountPaid}</span></p>
                    <p className="mb-1 flex text-xl font-bold text-gray-900 dark:text-white">Ngày vay: <span className="ml-4 font-medium text-lg" >{user.loanDate}</span></p>
                    <p className="mb-1 flex text-xl font-bold text-gray-900 dark:text-white">Thời hạn thanh toán: <span className='ml-4 font-medium text-lg'>{user.paymentTerm}</span></p>
                    <p className="mb-1 flex text-xl font-bold text-gray-900 dark:text-white">Tình trạng: <span className='ml-4 font-medium text-lg' style={{ color }}>{user.status}</span></p>
                    <p className="mb-1 flex text-xl font-bold text-gray-900 dark:text-white">Lưu ý: <span className='ml-4 font-medium text-lg'>{user.note}</span></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomePage