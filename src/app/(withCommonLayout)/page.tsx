import Banner from '@/components/Banner';
import JobCategories from '@/components/Categories';
import Testimonials from '@/components/Testiminials';
import AboutUs from '@/components/ui/AboutUs';
import WorkProcess from '@/components/WorkProcess';
import HomeBlogsSlider from '@/feature/blogs/HomeBlogsSection';
import RecentJobs from '@/feature/jobs/RecentJobs';
import RecentProjects from '@/feature/projects/RecentProjects';

const page = () => {
    return (
        <div>
            <Banner />
            {/* <Demo /> */}
            <WorkProcess />
            <RecentJobs />
            <RecentProjects />
            <JobCategories />
            <AboutUs />
            <Testimonials />
            <HomeBlogsSlider />
            {/* <Faq /> */}

        </div>
    );
};

export default page;