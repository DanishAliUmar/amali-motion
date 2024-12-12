import React from 'react'
import LoanForm from '../components/loanForm.jsx'
import Loader from '../components/Common/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { setCustomers } from '../redux/slices/customerSlice.js';

const HomeListing = () => {
  const customers = useSelector((state) => state.customer.customers);
  const dispatch = useDispatch();

  const handleUpdateCustomers = () => {
    const newCustomers = [
      { id: 3, name: 'Alice Brown', email: 'alice@example.com' },
      { id: 4, name: 'Bob Green', email: 'bob@example.com' },
    ];
    dispatch(setCustomers(newCustomers));
  };
  return (
    <div className="p-20 pt-60">
      <h1>Customer List</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.name} - {customer.email}
          </li>
        ))}
      </ul>
      <button onClick={handleUpdateCustomers}>Update Customers</button>
      {/* <LoanForm /> */}
    </div>
  )
}

export default HomeListing