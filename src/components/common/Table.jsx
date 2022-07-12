import React, {useState} from 'react';
import PropTypes from "prop-types";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Table = (props) => {
    const [sorted, setSorted] = useState({sorted_by: props.id, order: true});

    const sort = (sortBy) => {
        setSorted({ sorted_by: sortBy, order: !sorted.order});
        console.log(sorted);
    }

    return (
        <table className={"table table-hover"}>
            <thead>
                <tr>
                    {Object.keys(props.tableHeadings).map((heading)=>{
                        if(heading === sorted.sorted_by)
                            return <th className={"text-center"} scope={"row"} onClick={()=>sort(heading)} key={heading}>
                                {props.tableHeadings[heading] }
                                {sorted.order ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                            </th>;
                        return <th className={"text-center"} scope={"row"} onClick={()=>sort(heading)} key={heading}>{props.tableHeadings[heading]}</th>;
                    })}

                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>

                {props.tableData.sort((a,b)=>{
                    if (sorted.order) {
                        if (typeof(a[sorted.sorted_by]) === 'string'){
                            return a[sorted.sorted_by] > b[sorted.sorted_by] ? 1 : -1;
                        }
                        return a[sorted.sorted_by] - b[sorted.sorted_by];
                    }
                    else {
                        if (typeof(a[sorted.sorted_by]) === 'string') return b[sorted.sorted_by] > a[sorted.sorted_by] ? 1 : -1;
                        return b[sorted.sorted_by] - a[sorted.sorted_by];
                    }
                }).map((row)=>{
                    return <tr key={row[props.id]}>
                    {Object.keys(props.tableHeadings).map((heading)=>{
                        return <td className={"text-center"}>{row[heading]}</td>
                    })}
                        {(props.deleteHandler !== null)?
                                <td className={"text-center"}><button type="button" className={"btn btn-primary"} onClick={()=> props.deleteHandler(row[props.id])}>Delete</button></td>
                            : <td></td>
                        }
                        {(props.updateHandler !== null)?
                            <td className={"text-center"}><button type="button" className={"btn btn-primary"} onClick={()=> props.updateHandler(row[props.id])}>Update</button></td>
                            :<td></td>
                        }

                    </tr>
                })}


            </tbody>
        </table>
    );
};

Table.propTypes = {
    tableHeadings: PropTypes.object.isRequired,
    tableData: PropTypes.array.isRequired,
    deleteHandler: PropTypes.func,
    updateHandler: PropTypes.func,
    id: PropTypes.string.isRequired
}

Table.defaultProps = {
    deleteHandler: null,
    updateHandler: null
}
export default Table;
