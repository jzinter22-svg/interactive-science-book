import { Container } from "./Container";
import styles from "./Footer.module.css";

const columns = [
  {
    title: "المنصة",
    links: ["الرئيسية", "الفصول", "التمارين", "الأسئلة الشائعة"],
  },
  {
    title: "الدعم",
    links: ["مركز المساعدة", "تواصل معنا", "سياسة الخصوصية", "شروط الاستخدام"],
  },
  {
    title: "المجتمع",
    links: ["المعلمون", "أولياء الأمور", "المساهمة", "ملاحظات"],
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <span className={styles.brandText}>كتاب الطبيعيات التفاعلي</span>
            <p className={styles.tagline}>
              تجربة تعلم عصرية لمادة الفيزياء، مصممة لتكون واضحة ومريحة وممتعة في كل صفحة.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title} className={styles.col}>
              <h4 className={styles.colTitle}>{col.title}</h4>
              <ul className={styles.linkList}>
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className={styles.link}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.bottom}>
          <p>جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
        </div>
      </Container>
    </footer>
  );
}
