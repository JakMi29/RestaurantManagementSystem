import { Suspense, useState, ChangeEvent, useEffect } from 'react';
import { Await, defer, useLoaderData, useLocation, useNavigate, LoaderFunctionArgs } from 'react-router-dom';
import { CircularProgress, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import classes from './WaitersPage.module.css';
import uiClasses from '../../components/ux/Ui.module.css';
import { getWaiters } from '../../api/WaiterApi';
import { WaiterInterface, WaitersResponse } from '../../interfaces/Waiter';
import { Mode } from '../../constants/Mode';
import DialogComponent from '../../components/ux/dialogs/DialogComponent';
import { DialogMode } from '../../constants/DialogMode';
import Waiter from './components/Waiter';


const WaitersPage = () => {
  const { waiters } = useLoaderData() as { waiters: WaitersResponse };
  const [pageNumber, setPageNumber] = useState<number>(0);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState<string>(queryParams.get('search') || '');
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [waiter, setWaiter] = useState<WaiterInterface | undefined>();
  const [mode, setMode] = useState<Mode | undefined>();

  const handleOpenDialog = () => {
    setOpenForm(true);
    setMode(Mode.CREATE);
  };

  const handleEditWaiter = (waiter: WaiterInterface) => {
    setWaiter(waiter);
    setMode(Mode.EDIT);
    setOpenForm(true);
  };

  const handleCloseDialog = () => {
    setOpenForm(false);
    setWaiter(undefined);
  };

  useEffect(() => {
    navigate(`/waiters?pageNumber=${pageNumber}&pageSize=12${searchTerm ? `&searchTerm=${searchTerm}` : ""}`);
  }, [searchTerm, pageNumber])

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearchTerm(search);
  };

  const handleNextPage = () => {
    const page = pageNumber + 1;
    setPageNumber(page);
  };

  const handlePreviousPage = () => {
    if (pageNumber > 0) {
      const page = pageNumber - 1;
      setPageNumber(page);
    }
  };

  return (
    <div className={classes.page}>
      <DialogComponent open={openForm} onClose={handleCloseDialog} type={DialogMode.WAITER} mode={mode ?? Mode.READ} object={waiter} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button className={uiClasses.blueButton} onClick={handleOpenDialog}>
          New
        </button>
        <form>
          <TextField
            type="text"
            label="Search by name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
        <Await resolve={waiters}>
          {(waiters: WaitersResponse) => (
            <div style={{ display: "flex", flexDirection: "column", flex: "1", marginLeft: "auto" }}>
              <div className={classes.waitersContainer}>
                <Grid container spacing={1} sx={{ width: "100%" }}>
                  {waiters.content.map(waiter => (
                    <Grid size={4} key={waiter.email}>
                      <Waiter waiter={waiter} onEdit={handleEditWaiter} />
                    </Grid>
                  ))}
                </Grid>
              </div>
              <div className={classes.paginationContainer}>
                {!waiters.first && <button
                  className={uiClasses.blueButton}
                  onClick={handlePreviousPage}
                  disabled={pageNumber === 0}
                >
                  Previous
                </button>}
                {!waiters.last && <button style={{ marginLeft: "auto" }}
                  className={uiClasses.blueButton}
                  onClick={handleNextPage}
                  disabled={pageNumber >= waiters.totalPages - 1}
                >
                  Next
                </button>}
              </div>
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default WaitersPage;

async function loadWaiters(pageNumber: number, pageSize: number, searchTerm: string): Promise<WaitersResponse> {
  const response = await getWaiters({ pageNumber, pageSize, searchTerm })

  if (!response.ok) {
    throw new Error('Could not fetch waiter.');
  }

  return response.json();
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const pageNumber = url.searchParams.get("pageNumber");
  const searchTerm = url.searchParams.get("searchTerm") ?? "";
  const pageSize = url.searchParams.get("pageSize");;

  return defer({
    waiters: await loadWaiters(
      pageNumber ? parseInt(pageNumber, 10) : 0,
      pageSize ? parseInt(pageSize, 10) : 0,
      searchTerm
    ),
  });
}
