import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.math.BigDecimal;
import java.security.MessageDigest;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Random;
import javax.crypto.Cipher;

public class App {

    public static String[] NAMES = {"a", "b"};
    public int value;
    private int Bad_Field = 0;
    private int counter = 0;
    private static final int bad_constant = 5;
    private String password = "admin123";
    private String serverIp = "192.168.1.10";
    private String url = "http://example.com/api";

    public String Do_Thing(int a, int b) {
        int unused = 5;
        return "done";
    }

    public void readFile() throws Exception {
        FileReader reader = new FileReader("data.txt");
        reader.read();
    }

    public void readStream() throws Exception {
        FileInputStream stream = new FileInputStream("data.bin");
        stream.read();
    }

    public String lookup(String name) throws Exception {
        Connection conn = DriverManager.getConnection("jdbc:sqlite:app.db");
        Statement st = conn.createStatement();
        ResultSet rs = st.executeQuery("SELECT * FROM users WHERE name = '" + name + "'");
        return rs.getString(1);
    }

    public byte[] hashValue(String value) throws Exception {
        MessageDigest md = MessageDigest.getInstance("MD5");
        return md.digest(value.getBytes());
    }

    public Cipher makeCipher() throws Exception {
        return Cipher.getInstance("AES/ECB/PKCS5Padding");
    }

    public Cipher oldCipher() throws Exception {
        return Cipher.getInstance("DES");
    }

    public int makeToken() {
        Random random = new Random();
        return random.nextInt();
    }

    public void runCommand(String name) throws Exception {
        Runtime.getRuntime().exec("ls " + name);
    }

    public int nullProblem() {
        String text = null;
        return text.length();
    }

    public boolean compare(int a) {
        if (a == a) {
            return true;
        }
        return false;
    }

    public boolean floatCheck() {
        if (0.1 + 0.2 == 0.3) {
            return true;
        }
        return false;
    }

    public boolean stringCompare(String s) {
        if (s == "abc") {
            return true;
        }
        return false;
    }

    public boolean stringCompareTwo(String s) {
        return s != "xyz";
    }

    public boolean equalsWrong() {
        return "abc".equals(5);
    }

    public BigDecimal bigDecimal() {
        return new BigDecimal(0.1);
    }

    public void ignoredResult() {
        String text = "abc";
        text.toUpperCase();
    }

    public void loopForever() {
        while (true) {
            counter = counter + 1;
        }
    }

    public String duplicateCondition(int x) {
        if (x == 1) {
            return "one";
        } else if (x == 1) {
            return "uno";
        }
        return "other";
    }

    public String formatMismatch() {
        return String.format("%d items", "text");
    }

    public void printHello() {
        System.out.println("hello");
    }

    public boolean isEmpty(List<String> list) {
        return list.size() == 0;
    }

    public boolean isEmptyTwo(List<String> list) {
        return list.size() == 0;
    }

    public void doNothing() {
    }

    public void swallow() {
        try {
            Integer.parseInt("abc");
        } catch (Exception e) {
        }
    }

    public void printTrace() {
        try {
            Integer.parseInt("abc");
        } catch (NumberFormatException e) {
            e.printStackTrace();
        }
    }

    private void hidden() {
        System.out.println("never called");
    }

    private void hiddenTwo() {
        System.out.println("never called either");
    }

    public int deadStore() {
        int x = 5;
        x = 6;
        return x;
    }

    public String redundantCast() {
        String text = "abc";
        String other = (String) text;
        return other;
    }

    public int Bad_Local() {
        int Bad_Var = 1;
        return Bad_Var;
    }

    public int mergeIfs(boolean a, boolean b) {
        if (a) {
            if (b) {
                return 1;
            }
        }
        return 0;
    }

    public String sameBranches(int x) {
        if (x > 10) {
            return "big value";
        } else {
            return "big value";
        }
    }

    public int sameBody1(int a) {
        int x = a + 1;
        int y = x * 2;
        return y - 3;
    }

    public int sameBody2(int a) {
        int x = a + 1;
        int y = x * 2;
        return y - 3;
    }

    public String messages(int code) {
        if (code == 1) {
            return "invalid input data";
        }
        if (code == 2) {
            return "invalid input data";
        }
        if (code == 3) {
            return "invalid input data";
        }
        return "invalid input data";
    }

    public int complexLogic(int a, int b, int c, int d) {
        if (a > 0) {
            if (b > 0) {
                for (int i = 0; i < a; i++) {
                    if (i % 2 == 0) {
                        if (c > i) {
                            while (d > 0) {
                                if (d % 3 == 0) {
                                    d -= 2;
                                } else {
                                    d -= 1;
                                }
                            }
                        } else {
                            if (b > i) {
                                return i;
                            }
                        }
                    }
                }
            }
        }
        return 0;
    }

    public int anotherComplex(List<List<Integer>> items, int mode, boolean flag) {
        int result = 0;
        for (List<Integer> item : items) {
            if (mode == 1) {
                if (flag) {
                    for (int part : item) {
                        if (part > 0) {
                            if (part % 2 == 0) {
                                result += part;
                            } else {
                                result -= part;
                            }
                        }
                    }
                } else {
                    while (result < 100) {
                        if (result % 5 == 0) {
                            result += 3;
                        } else {
                            result += 1;
                        }
                    }
                }
            } else if (mode == 2) {
                if (flag && result > 10) {
                    result *= 2;
                }
            }
        }
        return result;
    }

    // TODO: fix this later
    // FIXME: this is broken
    // int result = compute(5);
    // System.out.println(result);

    public static void main(String[] args) {
        System.out.println("start");
    }
}

class bad_name {
    void method() {
    }
}
