import { useContext, useEffect, useState } from 'react';
import { ChangeThemeContext } from '../../App';
import i from './styles.module.css';

export function Users() {
  const { isDarkMode } = useContext(ChangeThemeContext);
  const [users, setUsers] = useState([]);
  const [perPage, setPerPage] = useState(6);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`https://reqres.in/api/users?per_page=${perPage}&page=${page}`);
        const data = await response.json();
        setUsers(data.data);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [perPage, page]);

  const handlePerPageChange = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className={`${i.container} ${isDarkMode ? i.darkTheme : i.lightTheme}`}>
      <div className={i.controls}>
        <div className={i.controlGroup}>
          <label htmlFor="perPageSelect">Results per page:</label>
          <select
            id="perPageSelect"
            value={perPage}
            onChange={handlePerPageChange}
            className={i.perPageSelect}
          >
            <option value={2}>2</option>
            <option value={6}>6</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
      <div className={`${i.usersContainer} ${isDarkMode ? i.darkTheme : i.lightTheme}`}>
        {users.map(user => (
          <div key={user.id} className={i.userBlock}>
            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
            <h3>{user.first_name} {user.last_name}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
      <div className={i.paginationControls}>
        <button className={i.navButton} onClick={handlePrevPage} disabled={page === 1} aria-label="Previous page">
          &laquo;
        </button>
        <span className={i.currentPage}>Page {page}</span>
        <button className={i.navButton} onClick={handleNextPage} disabled={page === totalPages} aria-label="Next page">
          &raquo;
        </button>
      </div>
    </div>
  );
}
