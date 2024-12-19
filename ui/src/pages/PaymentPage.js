import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentPage = () => {
    const location = useLocation();

    useEffect(() => {
      console.log(location.state);
    }, [location.state])
    

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Invalid pincode';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select a payment method';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (formData.paymentMethod === 'razorpay') {
        handleRazorpayPayment();
      } else {
        handleCODOrder();
      }
    }
  };

  const handleRazorpayPayment = async () => {
    
  };

  const handleCODOrder = () => {
    
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 
                    ${errors.name ? 'border-red-500' : 'border'}`}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 
                    ${errors.email ? 'border-red-500' : 'border'}`}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 
                    ${errors.phone ? 'border-red-500' : 'border'}`}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 
                    ${errors.address ? 'border-red-500' : 'border'}`}
                />
                {errors.address && (
                  <p className="text-sm text-red-500 mt-1">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 
                      ${errors.city ? 'border-red-500' : 'border'}`}
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500 mt-1">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 
                      ${errors.state ? 'border-red-500' : 'border'}`}
                  />
                  {errors.state && (
                    <p className="text-sm text-red-500 mt-1">{errors.state}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                  Pincode
                </label>
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 
                    ${errors.pincode ? 'border-red-500' : 'border'}`}
                />
                {errors.pincode && (
                  <p className="text-sm text-red-500 mt-1">{errors.pincode}</p>
                )}
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="razorpay"
                    name="paymentMethod"
                    type="radio"
                    value="razorpay"
                    checked={formData.paymentMethod === 'razorpay'}
                    onChange={handleInputChange}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                  />
                  <label htmlFor="razorpay" className="ml-2 block text-sm text-gray-700">
                    Razorpay (Online Payment)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="cod"
                    name="paymentMethod"
                    type="radio"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                  />
                  <label htmlFor="cod" className="ml-2 block text-sm text-gray-700">
                    Cash on Delivery (COD)
                  </label>
                </div>
              </div>
              {errors.paymentMethod && (
                <p className="text-sm text-red-500">{errors.paymentMethod}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              {formData.paymentMethod === 'razorpay' ? 'Pay Now' : 'Place Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Button } from '@/components/ui/button';
// import { Alert, AlertDescription } from '@/components/ui/alert';

// const PaymentPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     pincode: '',
//     paymentMethod: '',
//   });

//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.name.trim()) newErrors.name = 'Name is required';
//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
//     if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
//     if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
//     if (!formData.address.trim()) newErrors.address = 'Address is required';
//     if (!formData.city.trim()) newErrors.city = 'City is required';
//     if (!formData.state.trim()) newErrors.state = 'State is required';
//     if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
//     if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Invalid pincode';
//     if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select a payment method';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       if (formData.paymentMethod === 'razorpay') {
//         // Initialize Razorpay payment
//         handleRazorpayPayment();
//       } else {
//         // Handle COD order
//         handleCODOrder();
//       }
//     }
//   };

//   const handleRazorpayPayment = () => {
//     // Mock Razorpay integration
//     alert('Redirecting to Razorpay...');
//   };

//   const handleCODOrder = () => {
//     // Mock COD order processing
//     alert('Cash on Delivery order placed successfully!');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <Card className="max-w-2xl mx-auto">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">Payment Details</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Personal Information */}
//             <div className="space-y-4">
//               <div>
//                 <Label htmlFor="name">Full Name</Label>
//                 <Input
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className={errors.name ? 'border-red-500' : ''}
//                 />
//                 {errors.name && (
//                   <p className="text-sm text-red-500 mt-1">{errors.name}</p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className={errors.email ? 'border-red-500' : ''}
//                 />
//                 {errors.email && (
//                   <p className="text-sm text-red-500 mt-1">{errors.email}</p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="phone">Phone Number</Label>
//                 <Input
//                   id="phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   className={errors.phone ? 'border-red-500' : ''}
//                 />
//                 {errors.phone && (
//                   <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
//                 )}
//               </div>
//             </div>

//             {/* Address Information */}
//             <div className="space-y-4">
//               <div>
//                 <Label htmlFor="address">Address</Label>
//                 <Input
//                   id="address"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleInputChange}
//                   className={errors.address ? 'border-red-500' : ''}
//                 />
//                 {errors.address && (
//                   <p className="text-sm text-red-500 mt-1">{errors.address}</p>
//                 )}
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="city">City</Label>
//                   <Input
//                     id="city"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleInputChange}
//                     className={errors.city ? 'border-red-500' : ''}
//                   />
//                   {errors.city && (
//                     <p className="text-sm text-red-500 mt-1">{errors.city}</p>
//                   )}
//                 </div>
//                 <div>
//                   <Label htmlFor="state">State</Label>
//                   <Input
//                     id="state"
//                     name="state"
//                     value={formData.state}
//                     onChange={handleInputChange}
//                     className={errors.state ? 'border-red-500' : ''}
//                   />
//                   {errors.state && (
//                     <p className="text-sm text-red-500 mt-1">{errors.state}</p>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="pincode">Pincode</Label>
//                 <Input
//                   id="pincode"
//                   name="pincode"
//                   value={formData.pincode}
//                   onChange={handleInputChange}
//                   className={errors.pincode ? 'border-red-500' : ''}
//                 />
//                 {errors.pincode && (
//                   <p className="text-sm text-red-500 mt-1">{errors.pincode}</p>
//                 )}
//               </div>
//             </div>

//             {/* Payment Method Selection */}
//             <div className="space-y-4">
//               <Label>Payment Method</Label>
//               <RadioGroup
//                 name="paymentMethod"
//                 value={formData.paymentMethod}
//                 onValueChange={(value) => 
//                   setFormData(prev => ({ ...prev, paymentMethod: value }))
//                 }
//                 className="space-y-2"
//               >
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="razorpay" id="razorpay" />
//                   <Label htmlFor="razorpay">Razorpay (Online Payment)</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="cod" id="cod" />
//                   <Label htmlFor="cod">Cash on Delivery (COD)</Label>
//                 </div>
//               </RadioGroup>
//               {errors.paymentMethod && (
//                 <p className="text-sm text-red-500">{errors.paymentMethod}</p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <Button type="submit" className="w-full">
//               {formData.paymentMethod === 'razorpay' ? 'Pay Now' : 'Place Order'}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default PaymentPage;