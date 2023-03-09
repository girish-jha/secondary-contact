
type UpdaterProps = { newServiceWorkerDetected: boolean; onLoadNewServiceWorkerAccept: () => {}; }

export const Updater = (props: any) => {
    const { newServiceWorkerDetected, onLoadNewServiceWorkerAccept } = props;
    return true ? (
        <>
            New version detected.
            <button onClick={onLoadNewServiceWorkerAccept}>Update!</button>
        </>
    ) : null; // If no update is available, render nothing
}

// export default t;