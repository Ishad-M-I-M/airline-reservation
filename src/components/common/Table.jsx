import React from 'react';
import PropTypes from "prop-types";

const Table = (props) => {
    return (
        <table className={"table table-hover"}>
            <thead>
                <tr>
                    {props.tableHeadings.map((heading)=>{
                        return <th className={"text-center"} scope={"row"} key={heading}>{heading}</th>
                    })}
                    <th></th>
                </tr>
            </thead>
            <tbody>

                {props.tableData.map((row)=>{
                    console.log(row);
                    return <tr key={row[props.id]}>
                    {props.tableHeadings.map((heading)=>{
                        return <td className={"text-center"}>{row[heading]}</td>
                    })}
                        <td className={"text-center"}><button className={"btn btn-primary"} onClick={()=> props.deleteHandler(row[props.id])}>Delete</button></td>
                    </tr>
                })}


            </tbody>
        </table>
    );
};

Table.propTypes = {
    tableHeadings: PropTypes.array,
    tableData: PropTypes.array,
    deleteHandler: PropTypes.func,
    id: PropTypes.string
}
export default Table;
