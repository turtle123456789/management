import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
const [open,setOpen] = useState(false)
const [checkAll,setCheckAll] = useState(false)
const [idUpdate,setIdUpdate] = useState('')
const [typeAction,setTypeAction] = useState('add')
const [listCustomer,setListCustomer]= useState([])
const [message,setMessage] = useState({})
const user = JSON.parse(localStorage.getItem('userLogin'))
const navigate = useNavigate()
useEffect(()=>{
    if(!user.isAdmin){
        navigate('/home')
    }
    fetchData();
},[])
const fetchData = async() => {
    const data = await axios.get("https://backen-management.onrender.com/api/getCustomer")
    if (data?.status === 200){
        console.log('data?.data', data?.data)
        setListCustomer(data?.data.customers)
    }
}
const [formData, setFormData] = useState({
    name: '',
    phone: '',
    debt: '',
    loan: '',
    interestRate: '',
    serviceFee: '',
    exemption: '',
    amountPaid: '',
    status: '',
    loanDate: '',
    paymentTerm: '',
});


    const handleChange = (e) => {
    console.log('formData', formData)
    const { name, value, type, files } = e.target;
    setFormData({
        ...formData,
        [name]: type === 'file' ? files[0] : value,
    });
    };
    const deleteAll = async () => {
    try {
        const response = await axios.delete("https://backen-management.onrender.com/api/deleteAllCustomers", {
        data: { isAdmin: user.isAdmin }
        });
        console.log('response', response)
        setMessage({status:"Success",message:"Xóa thành công."})
        fetchData();
        setTimeout(() => {
            setMessage({})
        }, 2000);
    } catch (error) {
        setMessage({status:"Error",message:"Xóa không thành công!"})
        setTimeout(() => {
            setMessage({})
        }, 2000);
    }
    };
    const openModalEdit = async (phone) => {
        setTypeAction('update')
        if (phone !== "") {
            try {
                const response = await axios.get(`https://backen-management.onrender.com/api/customers/${phone}`);
                console.log('customer', response.data.customer);
                setIdUpdate(response.data.customer._id)
                setFormData({
                    name: response.data.customer.name,
                    phone: response.data.customer.phone,
                    debt: response.data.customer.debt,
                    loan: response.data.customer.loan,
                    interestRate: response.data.customer.interestRate,
                    serviceFee: response.data.customer.serviceFee,
                    exemption: response.data.customer.exemption,
                    amountPaid: response.data.customer.amountPaid,
                    status: response.data.customer.status,
                    loanDate: response.data.customer.loanDate,
                    paymentTerm: response.data.customer.paymentTerm,
                });
                setOpen(true);
            } catch (error) {
                console.error('Error fetching customer:', error);
                // Handle error here without affecting the rest of the site
            }
        }
    };
    
    const editUser = async (e) => {
        e.preventDefault();
        const updateCustomer ={
            isAdmin: user.isAdmin,
            name: formData.name,
            phone: formData.phone,
            debt: formData.debt,
            loan: formData.loan,
            interestRate: formData.interestRate,
            serviceFee: formData.serviceFee,
            exemption: formData.exemption,
            amountPaid: formData.amountPaid,
            status: formData.status,
            loanDate: formData.loanDate,
            paymentTerm: formData.paymentTerm
        }
        try {
            const response = await axios.put(`https://backen-management.onrender.com/api/editCustomer/${idUpdate}`, updateCustomer, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('response', response);
            fetchData();
            setMessage({ status: "Success", message: "Cập nhập thành công." });
            setOpen(false);
            setFormData({
                name: '',
                phone: '',
                debt: '',
                loan: '',
                interestRate: '',
                serviceFee: '',
                exemption: '',
                amountPaid: '',
                status: '',
                loanDate: '',
                paymentTerm: '',
            });
    
            setTimeout(() => {
                setMessage({});
            }, 2000);
        } catch (error) {
            console.error('Error updating customer:', error);  // Log chi tiết lỗi
            setMessage({ status: "Error", message: "Cập nhập không thành công!" });
            setTimeout(() => {
                setMessage({});
            }, 2000);
        }
      };
      
    const deleteUser = async (phone) => {
       
        try {
          const response = await axios.delete(`https://backen-management.onrender.com/api/deleteCustomer/${phone}`, {
            data: { isAdmin: user.isAdmin }
          });
          console.log('response', response)
          setMessage({status:"Success",message:"Xóa thành công."})
          fetchData();
            setTimeout(() => {
                setMessage({})
            }, 2000);
        } catch (error) {
            setMessage({status:"Error",message:"Xóa không thành công!"})
            setTimeout(() => {
                setMessage({})
            }, 2000);
        }
      };
      
const openModal = () => {
    setFormData({
        name: '',
        phone: '',
        debt: '',
        loan: '',
        interestRate: '',
        serviceFee: '',
        exemption: '',
        amountPaid: '',
        status: '',
        loanDate: '',
        paymentTerm: '',
    });
    setTypeAction('add')
    setOpen(!open)
}
const createCustomer = async (e) => {
    e.preventDefault();
    const newCustomer ={
        isAdmin: user.isAdmin,
        name: formData.name,
        phone: formData.phone,
        debt: formData.debt,
        loan: formData.loan,
        interestRate: formData.interestRate,
        serviceFee: formData.serviceFee,
        exemption: formData.exemption,
        amountPaid: formData.amountPaid,
        status: formData.status,
        loanDate: formData.loanDate,
        paymentTerm: formData.paymentTerm
    }
    console.log('newCustomer', newCustomer)
    try {
        const response = await axios.post('https://backen-management.onrender.com/api/createCustomer', newCustomer, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log('response', response)
        fetchData(); // Refresh data
        setOpen(false); // Close form or modal
        setMessage({ status: "Success", message: "Customer created successfully!" }); // Show success message
        setFormData({
            name: '',
            phone: '',
            debt: '',
            loan: '',
            interestRate: '',
            serviceFee: '',
            exemption: '',
            amountPaid: '',
            status: '',
            loanDate: '',
            paymentTerm: '',
        });

        setTimeout(() => {
            setMessage({});
        }, 3000);
    } catch (error) {
        console.error('There was an error creating the customer!', error);
        // Update message handling
        setMessage({ status: "Error", message: "Có lỗi xảy ra khi tạo khách hàng." });
        setTimeout(() => {
            setMessage({});
        }, 3000);
        // Optionally, display a user-friendly message or perform other actions
    }
};




return (
<div className="relative shadow-md sm:rounded-lg flex mt-4 justify-center h-screen ">
    <div className="fixed top-2">
        <div id="toast-danger" className={`${message.status==="Error"?"flex":"hidden"} items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800`} role="alert">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                </svg>
                <span className="sr-only">Error icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">{message.message}</div>
            <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
        <div id="toast-success" className={`${message.status==="Success"?"flex":"hidden"} items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800`} role="alert">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
                <span className="sr-only">Check icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">{message.message}</div>
            <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
    </div>
    <div className='h-full'>
        <div className={`${open ? "flex" : "hidden"} bg-[#000000ea] overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
            <div>
                <div className='flex'>
                    <button type="button" onClick={openModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form onSubmit={typeAction==='add'?createCustomer:editUser} className="max-w-md mx-auto">
                    <div className='flex items-center mb-2'>
                        <p className='text-md whitespace-nowrap text-[#fff]'>Họ tên khách:</p>
                        <div className="relative z-0 w-full group ml-2">
                            <input type="text" name='name'  value={formData.name} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="peer-focus:font-medium absolute left-1 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tên khách hàng</label>
                        </div>
                    </div>
                    <div className='flex items-center mb-2'>
                        <p className='text-md whitespace-nowrap text-[#fff]'>Số điện thoại:</p>
                        <div className="relative z-0 w-full group ml-2">
                            <input type="tel" name='phone' value={formData.phone} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="peer-focus:font-medium absolute left-1 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Số điện thoại</label>
                        </div>
                    </div>
                    
                    <div className='flex items-center mb-2'>
                        <p className='text-md whitespace-nowrap text-[#fff]'>Số lượng khoản vay:</p>
                        <div className="relative z-0 w-full group ml-2">
                            <input type="text" name='debt' value={formData.debt} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="peer-focus:font-medium absolute left-1 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Số lượng khoản vay</label>
                        </div>
                    </div>
                    <div className='flex items-center mb-2'>
                        <p className='text-md whitespace-nowrap text-[#fff]'>Số tiền vay:</p>
                        <div className="relative z-0 w-full group ml-2">
                            <input type="text" name='loan' value={formData.loan} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="peer-focus:font-medium absolute left-1 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Số tiền vay</label>
                        </div>
                    </div>
                    <div className='flex items-center mb-2'>
                        <p className='text-md whitespace-nowrap text-[#fff]'>Lãi suất:</p>
                        <div className="relative z-0 w-full group ml-2">
                            <input type="text" name='interestRate' value={formData.interestRate} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="peer-focus:font-medium absolute left-1 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Lãi suất</label>
                        </div>
                    </div>
                    <div className='flex items-center mb-2'>
                        <p className='text-md whitespace-nowrap text-[#fff]'>Phí dịch vụ:</p>
                        <div className="relative z-0 w-full group ml-2">
                            <input type="text" name='serviceFee' value={formData.serviceFee} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="peer-focus:font-medium absolute left-1 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phí dịch vụ</label>
                        </div>
                    </div>
                    <div className='flex items-center mb-2'>
                        <p className='text-md whitespace-nowrap text-[#fff]'>Miễn giảm:</p>
                        <div className="relative z-0 w-full group ml-2">
                            <input type="text" name='exemption' value={formData.exemption} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="peer-focus:font-medium absolute left-1 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Miễn giảm</label>
                        </div>
                    </div>
                    <div className='flex items-center mb-2'>
                        <p className='text-md whitespace-nowrap text-[#fff]'>Số tiền cần thanh toán:</p>
                        <div className="relative z-0 w-full group ml-2">
                            <input type="text" name='amountPaid' value={formData.amountPaid} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="peer-focus:font-medium absolute left-1 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Số tiền cần thanh toán</label>
                        </div>
                    </div>
                    <div className='flex items-center mb-2'>
                        <p className='text-md whitespace-nowrap text-[#fff]'>Ngày vay:</p>
                        <div className="relative z-0 w-full group ml-2">
                            <input type="date" name='loanDate'  value={formData.loanDate} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="peer-focus:font-medium absolute left-1 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ngày vay</label>
                        </div>
                    </div>
                    <div className='flex items-center mb-2'>
                        <p className='text-md whitespace-nowrap text-[#fff]'>Thời hạn thanh toán:</p>
                        <div className="relative z-0 w-full group ml-2">
                            <input type="date" name='paymentTerm' value={formData.paymentTerm} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="peer-focus:font-medium absolute left-1 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Thời hạn thanh toán</label>
                        </div>
                    </div>
                    <div className='flex items-center mb-2'>
                        <p className='text-md whitespace-nowrap text-[#fff]'>Tình trạng:</p>
                        <div className="relative z-0 w-full group ml-2">
                            <input type="text" name='status'  value={formData.status} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label className="peer-focus:font-medium absolute left-1 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tình trạng</label>
                        </div>
                    </div>
                    <button type="submit" className="float-end py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">{typeAction==='add'?"Thêm":"Cập nhập"}</button>
                </form>

            </div>
        </div>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>Bảng khách hàng</h1>
        <div className='float-end w-[280px]'>
            <button type="button" onClick={openModal} className=" py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Thêm khách hàng</button>
            <button type="button" onClick={deleteAll} className={`${checkAll?"":"hidden"}  py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}>Xóa tất cả</button>
        </div>
        <table className=" mt-5 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        <input onChange={(e) => setCheckAll(e.target.checked)}   type="checkbox" value="" className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Số thứ tự
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Số điện thoại
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Họ tên
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Số tiền
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Thanh toán
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Thao tác
                    </th>
                </tr>
            </thead>
            <tbody className='w-full'>
                {listCustomer?.map((data,index)=>{
                    return(
                    <tr key={`customer-${index}`} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <input checked={checkAll}  type="checkbox" value="" className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        </th>
                        <td className="px-6 py-4">
                            {index+1}
                        </td>
                        <td className="px-6 py-4">
                            {data?.phone} 
                        </td>
                        <td className="px-6 py-4">
                            {data?.name}
                        </td>
                        <td className="px-6 py-4">
                        {new Intl.NumberFormat('vi-VN').format(data?.amountPaid)}đ
                        </td>
                        <td className="px-6 py-4">
                            <input  type="checkbox" value="" className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        </td>
                        <td className="px-6 py-4">
                            <button type='button' onClick={()=>openModalEdit(data?.phone)}>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                </svg>              
                            </button>
                            <button type='button' onClick={()=>deleteUser(data?.phone)}>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                </svg>
                            </button>
                        </td>

                    </tr>
                    )
                })}
            </tbody>
        </table>        
    </div>
</div>
)
}

export default AdminPage