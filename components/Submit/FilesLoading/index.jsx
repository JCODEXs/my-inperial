import { useSubmit } from "vStore/submit";
import styles from "./filesLoading.module.css";
export default function FilesLoading() {
  const { newSubmission } = useSubmit();
  return (
    <div className={styles.main}>
      {false && <img src="wizard2.gif" />}
      {newSubmission.map((value, index) => {
        const progress = value.progress;
        const inverseProgress = 100 - value.progress;
        return (
          <div>
            <div className={styles.loadingSubmission}>{value.file?.name}</div>
            <div className={styles.loadingBar_ext}>
              <div
                className={styles.loadingBar}
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, rgb(0, 100, 100) ${
                    0 + inverseProgress
                  }%, rgba(0,255,120,1) ${100 + inverseProgress}%)`,
                }}
              >
                {`${value.progress}%`}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
