import React from 'react'

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("userLogin"))

  return (
    <div>
        <div className='flex items-center justify-center h-screen'>
            <div className="w-full max-w-[1050px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h1 className='text-3xl font-medium text-gray-900 dark:text-white'>Thông tin khách hàng</h1>
                <div className='p-11'>
                    <p className="mb-1 flex text-xl font-medium text-gray-900 dark:text-white">Họ tên khách: <span className='ml-4 text-lg'>{user.name}</span></p>
                    <p className="mb-1 flex text-xl font-medium text-gray-900 dark:text-white">Số điện thoại: <span className='ml-4 text-lg'>{user.phone}</span></p>
                    <p className="mb-1 flex text-xl font-medium text-gray-900 dark:text-white">Số lượng khoản vay: <span className='ml-4 text-lg'>{user.debt}</span></p>
                    <p className="mb-1 flex text-xl font-medium text-gray-900 dark:text-white">Số tiền vay: <span className='ml-4 text-lg'>{user.loan}</span></p>
                    <p className="mb-1 flex text-xl font-medium text-gray-900 dark:text-white">Lãi suất: <span className='ml-4 text-lg'>{user.interestRate}</span></p>
                    <p className="mb-1 flex text-xl font-medium text-gray-900 dark:text-white">Phí dịch vụ: <span className='ml-4 text-lg'>{user.serviceFee}</span></p>
                    <p className="mb-1 flex text-xl font-medium text-gray-900 dark:text-white">Miễn giảm: <span className='ml-4 text-lg'>{user.exemption}</span></p>
                    <p className="mb-1 flex text-xl font-medium text-gray-900 dark:text-white">Số tiền cần thanh toán: <span className='ml-4 text-lg'>{user.amountPaid}</span></p>
                    <p className="mb-1 flex text-xl font-medium text-gray-900 dark:text-white">Ngày vay: <span className='ml-4 text-lg'>{user.status}</span></p>
                    <p className="mb-1 flex text-xl font-medium text-gray-900 dark:text-white">Thời hạn thanh toán: <span className='ml-4 text-lg'>{user.loanDate}</span></p>
                    <p className="mb-1 flex text-xl font-medium text-gray-900 dark:text-white">Tình trạng: <span className='ml-4 text-lg'>{user.paymentTerm}</span></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomePage