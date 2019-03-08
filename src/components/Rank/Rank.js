import React from 'react';

const Rank = ({name,entries}) => {
    return (
        <div>
           <div className="lightest-blue f2">
                {`${name}, your entry count is ...`}
           </div>
           <div className="gold f1">
                {entries}
            </div>
        </div>
    )
}

export default Rank;