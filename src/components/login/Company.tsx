interface iCompany {
    id: number,
    name: string
}

function Company({ id, name }: iCompany) {
    return (
        <option key={id} value={name}>{name}</option>
    );
};

export default Company;