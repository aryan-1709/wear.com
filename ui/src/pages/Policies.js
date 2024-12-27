import React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

const Policies = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-5xl font-bold text-center mb-12 text-gray-800">
        Our Store Policies
      </h1>

      {/* Privacy Policy */}
      <Collapsible.Root className="mb-10 group">
        <Collapsible.Trigger className="flex items-center justify-between w-full py-4 px-6 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-all group-hover:shadow-lg">
          <span className="text-2xl font-semibold text-indigo-800">
            Privacy Policy
          </span>
          <ChevronDown className="h-6 w-6 text-indigo-500 group-open:hidden" />
          <ChevronUp className="h-6 w-6 text-indigo-500 hidden group-open:block" />
        </Collapsible.Trigger>
        <Collapsible.Content className="mt-4 px-6">
          <p className="text-gray-700 leading-relaxed">
            At our store, we value your trust and are committed to protecting
            your personal information. This Privacy Policy outlines how we
            collect, use, and safeguard your data.
          </p>
          <ul className="list-disc list-inside mt-4 space-y-3 text-gray-600">
            <li>
              <strong>Data Collection:</strong> We collect personal details
              such as your name, email, phone number, and shipping address to
              process your orders.
            </li>
            <li>
              <strong>Purpose:</strong> Your data helps us ensure seamless
              transactions, provide customer support, and offer personalized
              recommendations.
            </li>
            <li>
              <strong>Cookies:</strong> We use cookies to track your preferences
              and improve website performance. You can disable cookies in your
              browser settings.
            </li>
            <li>
              <strong>Third-Party Services:</strong> Your information may be
              shared with secure payment gateways and shipping providers for
              order fulfillment.
            </li>
            <li>
              <strong>Security Measures:</strong> We use encryption and secure
              servers to protect your data from unauthorized access.
            </li>
            <li>
              <strong>Your Rights:</strong> You have the right to access, modify,
              or delete your personal data. Contact us for assistance.
            </li>
          </ul>
        </Collapsible.Content>
      </Collapsible.Root>

      {/* Refund Policy */}
      <Collapsible.Root className="mb-10 group">
        <Collapsible.Trigger className="flex items-center justify-between w-full py-4 px-6 bg-green-100 rounded-lg hover:bg-green-200 transition-all group-hover:shadow-lg">
          <span className="text-2xl font-semibold text-green-800">
            Refund Policy
          </span>
          <ChevronDown className="h-6 w-6 text-green-500 group-open:hidden" />
          <ChevronUp className="h-6 w-6 text-green-500 hidden group-open:block" />
        </Collapsible.Trigger>
        <Collapsible.Content className="mt-4 px-6">
          <p className="text-gray-700 leading-relaxed">
            We aim to ensure your satisfaction with every purchase. If you are
            not happy, here is our refund policy.
          </p>
          <ul className="list-disc list-inside mt-4 space-y-3 text-gray-600">
            <li>
              <strong>Eligibility for Refunds:</strong> Refunds are offered for
              items that are defective, damaged, or not as described. To be
              eligible, the item must be unused and in its original packaging.
            </li>
            <li>
              <strong>Non-Refundable Items:</strong> Customized or personalized
              items are not eligible for refunds unless they arrive damaged or
              defective.
            </li>
            <li>
              <strong>How to Request a Refund:</strong> Contact us at
              support@example.com within 30 days of receiving your order. Please
              provide your order number and photos of the defective item.
            </li>
            <li>
              <strong>Shipping Costs:</strong> Shipping costs are non-refundable,
              except when the return is due to an error on our part (e.g.,
              wrong item sent).
            </li>
            <li>
              <strong>Processing Time:</strong> Refunds are processed within 7-10
              business days after we receive the returned item.
            </li>
          </ul>
          <p className="mt-4 text-gray-600">
            For any additional questions or concerns, please contact our
            customer support team at support@example.com.
          </p>
        </Collapsible.Content>
      </Collapsible.Root>

      {/* Shipping Policy */}
      <Collapsible.Root className="mb-10 group">
        <Collapsible.Trigger className="flex items-center justify-between w-full py-4 px-6 bg-blue-100 rounded-lg hover:bg-blue-200 transition-all group-hover:shadow-lg">
          <span className="text-2xl font-semibold text-blue-800">
            Shipping Policy
          </span>
          <ChevronDown className="h-6 w-6 text-blue-500 group-open:hidden" />
          <ChevronUp className="h-6 w-6 text-blue-500 hidden group-open:block" />
        </Collapsible.Trigger>
        <Collapsible.Content className="mt-4 px-6">
          <p className="text-gray-700 leading-relaxed">
            We are committed to delivering your orders as quickly and efficiently as possible.
          </p>
          <ul className="list-disc list-inside mt-4 space-y-3 text-gray-600">
            <li>
              <strong>Minimum Delivery Time:</strong> 2 business days.
            </li>
            <li>
              <strong>Maximum Delivery Time:</strong> 20 business days.
            </li>
            <li>
              <strong>Order Tracking:</strong> Once your order is shipped, you
              will receive a tracking number via email.
            </li>
            <li>
              <strong>Delays:</strong> Delays may occur during peak seasons or due to unforeseen circumstances. 
            </li>
          </ul>
        </Collapsible.Content>
      </Collapsible.Root>

      {/* Terms and Conditions */}
      <Collapsible.Root className="group">
        <Collapsible.Trigger className="flex items-center justify-between w-full py-4 px-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all group-hover:shadow-lg">
          <span className="text-2xl font-semibold text-gray-800">
            Terms and Conditions
          </span>
          <ChevronDown className="h-6 w-6 text-gray-500 group-open:hidden" />
          <ChevronUp className="h-6 w-6 text-gray-500 hidden group-open:block" />
        </Collapsible.Trigger>
        <Collapsible.Content className="mt-4 px-6">
          <p className="text-gray-700 leading-relaxed">
            By using our services, you agree to the following terms and conditions:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-3 text-gray-600">
            <li>
              <strong>Usage:</strong> Our products are intended for personal use only and not for resale.
            </li>
            <li>
              <strong>Pricing:</strong> Prices are subject to change without notice.
            </li>
            <li>
              <strong>Liability:</strong> We are not responsible for delays or issues caused by third-party services.
            </li>
            <li>
              <strong>Compliance:</strong> You agree to comply with local laws and regulations regarding online purchases.
            </li>
          </ul>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
};

export default Policies;
