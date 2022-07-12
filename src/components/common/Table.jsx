import React, {useState} from 'react';
import PropTypes from "prop-types";

const Table = (props) => {
    /*
    * sorted object to store the status of sorting
    * order : false - corresponds to descending
    *         true  - corresponds to ascending
    * */
    const [sorted, setSorted] = useState({sorted_by: props.id, order: false});
    const [tableData, setTableData] = useState([]);

    const sort = (sortBy) => {
        setSorted({ sorted_by: sortBy, order: !sorted.order});
        console.log(sorted);
        let data = [...tableData];
        data.sort((a,b)=>{
            if (sorted.order) return a[sortBy] - b[sortBy];
            else return b[sortBy] - a[sortBy]
        });
        setTableData(data);
        console.log(data);
    }

    return (
        <table className={"table table-hover"}>
            <thead>
                <tr>
                    {Object.keys(props.tableHeadings).map((heading)=>{
                        return <th className={"text-center"} scope={"row"} onClick={()=>sort(heading)} key={heading}>{props.tableHeadings[heading]}</th>
                    })}

                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>

                {props.tableData.map((row)=>{
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
