import Container from "../../../components/layouts/container/Container";
import Notice from "../../../components/UI/notice/Notice";
import Post from "../../../components/UI/post/Post";

const Timeline = () => {
  return (
    <Container>
      <div className="class-timeline">
        <div className="class-timeline__notice">
          <Notice
            title="Đồ án giữa kỳ"
            commentCount={2}
            type="assignment"
            deadline="24/11/2021"
          />
          <Notice
            title="React basic"
            commentCount={5}
            type="video"
            deadline="22/11/2021"
          />
        </div>

        <div className="class-timeline__posts">
          <Post
            owner="Hồ Hoàng Việt Tiến"
            timeCreate="19/11/2021"
            content="Công ty Fossil sẽ tiếp tục trình bày về Cách thức mở rộng hệ thống, microservices, điện toán đám mây... & Quy trình, các công nghệ sử dụng trong quá trình xây dựng ứng dụng (Git flow, CI/CD, Docker, Kubernetes, AWS, GCW, Azure, ...) trong buổi học 18/11/2021."
          />
          <Post
            owner="Hồ Hoàng Việt Tiến"
            timeCreate="19/11/2021"
            content="Công ty Fossil sẽ tiếp tục trình bày về Cách thức mở rộng hệ thống, microservices, điện toán đám mây... & Quy trình, các công nghệ sử dụng trong quá trình xây dựng ứng dụng (Git flow, CI/CD, Docker, Kubernetes, AWS, GCW, Azure, ...) trong buổi học 18/11/2021."
          />
          <Post
            owner="Hồ Hoàng Việt Tiến"
            timeCreate="19/11/2021"
            content="Công ty Fossil sẽ tiếp tục trình bày về Cách thức mở rộng hệ thống, microservices, điện toán đám mây... & Quy trình, các công nghệ sử dụng trong quá trình xây dựng ứng dụng (Git flow, CI/CD, Docker, Kubernetes, AWS, GCW, Azure, ...) trong buổi học 18/11/2021."
          />
          <Post
            owner="Hồ Hoàng Việt Tiến"
            timeCreate="19/11/2021"
            content="Công ty Fossil sẽ tiếp tục trình bày về Cách thức mở rộng hệ thống, microservices, điện toán đám mây... & Quy trình, các công nghệ sử dụng trong quá trình xây dựng ứng dụng (Git flow, CI/CD, Docker, Kubernetes, AWS, GCW, Azure, ...) trong buổi học 18/11/2021."
          />
          <Post
            owner="Hồ Hoàng Việt Tiến"
            timeCreate="19/11/2021"
            content="Công ty Fossil sẽ tiếp tục trình bày về Cách thức mở rộng hệ thống, microservices, điện toán đám mây... & Quy trình, các công nghệ sử dụng trong quá trình xây dựng ứng dụng (Git flow, CI/CD, Docker, Kubernetes, AWS, GCW, Azure, ...) trong buổi học 18/11/2021."
          />
          <Post
            owner="Hồ Hoàng Việt Tiến"
            timeCreate="19/11/2021"
            content="Công ty Fossil sẽ tiếp tục trình bày về Cách thức mở rộng hệ thống, microservices, điện toán đám mây... & Quy trình, các công nghệ sử dụng trong quá trình xây dựng ứng dụng (Git flow, CI/CD, Docker, Kubernetes, AWS, GCW, Azure, ...) trong buổi học 18/11/2021."
          />
        </div>
      </div>
    </Container>
  );
};

export default Timeline;
