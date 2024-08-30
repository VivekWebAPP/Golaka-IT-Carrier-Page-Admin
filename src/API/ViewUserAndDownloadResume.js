export const getAllRegesteredUser = async (authToken) => {
    try {
        const response = await fetch('https://golaka-it-carrier-page.onrender.com/resume/admin/users', {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": authToken,
            },
        });

        const data = await response.json();
        if (data.error) {
            throw new Error('Login Error');
        }
        return data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}

export const downloadResumeOfUser = async (id, authToken) => {
    try {
        const response = await fetch(`https://golaka-it-carrier-page.onrender.com/resume/admin/download/${id}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": authToken,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch resume');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `resume_${id}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error('Error downloading resume:', error.message);
    }
};
