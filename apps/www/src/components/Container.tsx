import React from "react";

const Container = ({
     children
}: {
     children?: React.ReactNode
}) => {
     return (
          <div className="w-full flex justify-center items-center">
               <div className="w-full max-w-6xl px-[30px] xl:px-[0px]">
                    {children}
               </div>
          </div>
     );
}

export default Container;