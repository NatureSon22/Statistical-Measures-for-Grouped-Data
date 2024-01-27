const TableColumn = ({ label, data }) => {
    return (
        <div className="table-column">
            <div className="column-header" >{label}</div>
            {
                data?.map((item, i) => {
                    return (
                        <div key={i} className="column-field" >
                            {item}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TableColumn