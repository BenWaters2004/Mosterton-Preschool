import React from 'react';

const AdminFooter = () => {

  return (
    <section className='w-full md:fixed bottom-0'>
      {/* Copyright section */}
      <div className="copyright w-full bg-primary text-white text-center text-[18px] py-[9px]">
        <p>
          <a href="https://b-waters.com" className="hover:underline px-4">Website by Ben Waters</a>Copyright © 2024 Mosterton Preschool
        </p>
      </div>
    </section>
  );
};

export default AdminFooter;
